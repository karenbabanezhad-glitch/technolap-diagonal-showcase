import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TechnolapPage } from "@/components/technolap-page";

afterEach(cleanup);

function setupCart() {
  const view = render(<TechnolapPage />);
  function element(selector: string) {
    const node = view.container.querySelector<HTMLElement>(selector);
    if (!node) throw new Error(`Missing control: ${selector}`);
    return node;
  }
  return { element, add: () => fireEvent.click(element(".add-to-cart")) };
}

describe("Imported demonstration cart", () => {
  it("counts each addition, including the same item twice", () => {
    const { element, add } = setupCart();
    expect(element("#cart-count").textContent).toBe((0).toLocaleString("fa-IR"));
    add();
    add();
    expect(element("#cart-count").textContent).toBe((2).toLocaleString("fa-IR"));
  });

  it("removes only the selected occurrence", () => {
    const { element, add } = setupCart();
    add();
    add();
    fireEvent.click(element(".cart-remove"));
    expect(element("#cart-count").textContent).toBe((1).toLocaleString("fa-IR"));
  });

  it("clears every item", () => {
    const { element, add } = setupCart();
    add();
    add();
    fireEvent.click(element("#clear-cart"));
    expect(element("#cart-count").textContent).toBe((0).toLocaleString("fa-IR"));
  });
});
