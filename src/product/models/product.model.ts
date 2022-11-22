import { AbstractModel } from 'src/common/abstract.model';

export class Product extends AbstractModel {
  readonly title: string;
  readonly image: string;
}
