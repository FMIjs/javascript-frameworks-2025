type ProviderDefUseFactory = {
  useFactory: (dm: DependencyManager) => any;
  provide: any;
};

type ProviderDefUseClass = {
  useClass: any;
  provide: any;
};

type ProviderDefUseValue = {
  useValue: any;
  provide: any;
};

type ProviderDef =
  | ProviderDefUseClass
  | ProviderDefUseValue
  | ProviderDefUseFactory;

export class DependencyManager {
  private instances: any[] = [];

  constructor(private defs: ProviderDef[]) {}

  get(token: any) {
    let instance =
      typeof token === "symbol"
        ? null
        : this.instances.find((i) => i instanceof token);
    if (instance) return instance;
    const def = this.defs.find((d) => d.provide === token);
    if (!def) return null;
    if ("useClass" in def) {
      const instance = new def.useClass(this);
      this.instances.push(instance);
      return instance;
    }
    if ("useFactory" in def) {
      const instance = def.useFactory(this);
      if (typeof instance === "object" && instance !== null)
        this.instances.push(instance);
      return instance;
    }
    return def.useValue;
  }

  provide(defs: ProviderDef[]) {
    this.defs = this.defs.concat(defs);
  }
}
