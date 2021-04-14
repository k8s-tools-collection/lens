// Extensions-api -> Register page menu items
import type { IconProps } from "../../renderer/components/icon";
import type React from "react";
import type { PageTarget, RegisteredPage } from "./page-registry";
import { action } from "mobx";
import { BaseRegistry } from "./base-registry";
import { LensExtension } from "../lens-extension";

export interface PageMenuRegistration<V> {
  target?: PageTarget<V>;
  title: React.ReactNode;
  components: PageMenuComponents;
}

export interface ClusterPageMenuRegistration<V> extends PageMenuRegistration<V> {
  id?: string;
  parentId?: string;
}

export interface PageMenuComponents {
  Icon: React.ComponentType<IconProps>;
}

export class PageMenuRegistry<V, T extends PageMenuRegistration<V>> extends BaseRegistry<T> {
  @action
  add(items: T[], ext: LensExtension) {
    const normalizedItems = items.map(menuItem => {
      menuItem.target = {
        extensionId: ext.name,
        ...(menuItem.target || {}),
      };

      return menuItem;
    });

    return super.add(normalizedItems);
  }
}

export class ClusterPageMenuRegistry extends PageMenuRegistry<any, ClusterPageMenuRegistration<any>> {
  getRootItems() {
    return this.getItems().filter((item) => !item.parentId);
  }

  getSubItems<V>(parent: ClusterPageMenuRegistration<V>) {
    return this.getItems()
      .filter(item => (
        item.parentId === parent.id
        && item.target?.extensionId === parent.target?.extensionId
      ));
  }

  getByPage<V>({ id: pageId, extensionId }: RegisteredPage<V>) {
    return this.getItems()
      .find((item) => (
        item.target?.pageId == pageId
        && item.target.extensionId === extensionId
      ));
  }
}

export const globalPageMenuRegistry = new PageMenuRegistry();
export const clusterPageMenuRegistry = new ClusterPageMenuRegistry();
