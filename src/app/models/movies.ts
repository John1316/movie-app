export class movies{
    constructor(
      public id: number,
      public category_id: number,
      public name:   string,
      public description:   string,
      public image:      string,
      public created_at: Date,
      public updated_at: Date,
      public length: number,
    ){}
}
