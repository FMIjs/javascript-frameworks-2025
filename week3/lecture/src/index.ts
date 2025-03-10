const myDiv = document.createElement("div");
myDiv.innerHTML = "<h1>HELLO!</h1>";
document.body.appendChild(myDiv);

type LoggerDecorator = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any) => any>
) => TypedPropertyDescriptor<(...args: any) => any> | void;

function logMethod(): LoggerDecorator {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value as Function;

    descriptor.value = function (...args: any[]) {
      const timestamp = new Date().toISOString();
      console.log(
        `[${timestamp}] Method "${String(propertyKey)}" called with arguments:`,
        args
      );

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Demo {
  @logMethod()
  public foo(bar: number) {
    console.log("Bar", bar);
  }
}

const test = new Demo();
test.foo(123);

function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}

@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  test() {}
}

const a = new BugReport("a");

console.log(a);
