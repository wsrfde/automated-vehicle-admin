<script lang="tsx">
import { defineComponent, ref, watch, h, compile, computed } from 'vue';
import {
  useRouter,
  useRoute,
  RouteRecordRaw,
  RouteRecordNormalized,
} from 'vue-router';
import { useAppStore } from '@/store';
import usePermission from '@/hooks/permission';
import { isExternal } from '@/utils/validate';

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const appStore = useAppStore();
    const permission = usePermission();
    const router = useRouter();
    const route = useRoute();
    const collapsed = ref(false);
    const appRoute = computed(() => {
      return router
        .getRoutes()
        .find((el) => el.name === 'root') as RouteRecordNormalized;
    });
    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));
      function travel(_routes: RouteRecordRaw[], layer: number) {
        if (!_routes) return null;
        const collector: any = _routes.map((element) => {
          // no access
          if (!permission.accessRouter(element)) {
            return null;
          }

          // leaf node
          if (!element.children) {
            return element;
          }

          // route filter hideInMenu true
          element.children = element.children.filter(
            (x) => x.meta?.hideInMenu !== true,
          );

          // Associated child node
          const subItem = travel(element.children, layer);
          if (subItem.length) {
            element.children = subItem;
            return element;
          }
          // the else logic
          if (layer > 1) {
            element.children = subItem;
            return element;
          }

          if (element.meta?.hideInMenu === false) {
            return element;
          }

          return null;
        });
        return collector.filter(Boolean);
      }
      return travel(copyRouter, 0);
    });

    // In this case only two levels of menus are available
    // You can expand as needed

    const selectedKey = ref<string[]>([]);
    const goto = (item: RouteRecordRaw) => {
      // 判断是否是外部链接，如果是打开新窗口跳转
      if (isExternal(item.path)) {
        window.open(item.path as string, '_blank');
      } else {
        router.push({
          name: item.name,
        });
      }
    };
    watch(
      route,
      (newVal) => {
        if (newVal.meta.requiresAuth && !newVal.meta.hideInMenu) {
          const key = newVal.matched[2]?.name as string;
          selectedKey.value = [key];
        }
      },
      {
        immediate: true,
      },
    );
    watch(
      () => appStore.menuCollapse,
      (newVal) => {
        collapsed.value = newVal;
      },
      {
        immediate: true,
      },
    );
    const setCollapse = (val: boolean) => {
      appStore.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // console.log(element);
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon ? `<${element?.meta?.icon}/>` : ``;
            const r = element.children ? (
              <a-sub-menu
                key={element?.name}
                v-slots={{
                  icon: () => h(compile(icon)),
                  title: () => h(compile(element?.meta?.title || '')),
                }}
              >
                {element?.children?.map((elem) => {
                  return (
                    <a-menu-item key={elem.name} onClick={() => goto(elem)}>
                      {elem?.meta?.title || ''}
                      {travel(elem.children ?? [])}
                    </a-menu-item>
                  );
                })}
              </a-sub-menu>
            ) : (
              <a-menu-item
                v-slots={{
                  icon: () => h(compile(icon)),
                  title: () => h(compile(element?.meta?.title || '')),
                }}
                key={element?.name}
                onClick={() => goto(element)}
              >
                {element?.meta?.title || ''}
              </a-menu-item>
            );
            nodes.push(r as never);
          });
        }
        return nodes;
      }
      return travel(menuTree.value);
    };
    return () => (
      <a-menu
        theme="dark"
        v-model:collapsed={collapsed.value}
        show-collapse-button
        auto-open={false}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
