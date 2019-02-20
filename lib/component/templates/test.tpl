/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../{{TAG_NAME}}.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<{{TAG_NAME}}></{{TAG_NAME}}>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
