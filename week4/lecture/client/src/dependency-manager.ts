export class DependencyManager {
  private instances: any[] = [];

  constructor(
    private defs: {
      useClass: any;
      provide: any;
    }[]
  ) {}

  get(klass: any) {
    let instance = this.instances.find((i) => i instanceof klass);
    if (instance) return instance;
    const def = this.defs.find((d) => d.provide === klass);
    if (!def) return null;
    instance = new def.useClass(this);
    return instance;
  }
}
