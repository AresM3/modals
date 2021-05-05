import {BaseModel, ModelManager} from "@m3team/paged-tables";

export interface HasManagerModal<T extends BaseModel>{
    instanceManager(): ModelManager<T>;
}
