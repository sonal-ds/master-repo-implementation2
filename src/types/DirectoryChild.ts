import { DirectoryParent } from "./DirectoryParent";

export interface DirectoryChild {
  name: string;
  mainPhone: string;
  slug: string;
  c_addressRegionDisplayName?: string;
  dm_childEntityIds?: string[];
  dm_directoryChildren: number;
  dm_directoryParents: DirectoryParent[];
}
