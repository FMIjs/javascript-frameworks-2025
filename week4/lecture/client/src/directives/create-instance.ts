import { directive, Directive, PartInfo, PartType } from "lit/directive.js";
import { html, render } from "lit";
import { DependencyManager } from "../dependency-manager";
import { AuthService } from "../services/auth.service";
import { of, using } from "rxjs";

class AuthMock {
  login(...data: any) {
    console.log(data);
    return of({ token: "123", user: {} });
  }
}

const dependencyManager = new DependencyManager([
  {
    useClass: AuthMock,
    provide: AuthService,
  },
]);

class CreateInstanceDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type === PartType.CHILD) return;
    throw new Error("createInstance() can only be used in child bindings");
  }

  render(
    ComponentClass: any,
    properties: Record<string, unknown> = {},
    content = ""
  ) {
    const element = new ComponentClass(dependencyManager);
    Object.assign(element, properties);
    render(html`${content}`, element);
    return element;
  }
}

export const createInstance = directive(CreateInstanceDirective);
