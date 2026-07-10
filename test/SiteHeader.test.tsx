// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "@/components/SiteHeader";

describe("SiteHeader mobile navigation", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it("shows country-first navigation without the mixed calculator catalogue", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const menu = screen.getByRole("navigation", { name: "Mobile menu" });
    const links = within(menu).getAllByRole("link");

    expect(within(menu).getByText("Choose your country")).toBeTruthy();
    expect(within(menu).getByText("United Kingdom").closest("a")?.getAttribute("href")).toBe("/uk");
    expect(within(menu).getByText("United States").closest("a")?.getAttribute("href")).toBe("/us");
    expect(within(menu).getByText("Canada").closest("a")?.getAttribute("href")).toBe("/ca");
    expect(within(menu).getByText("Australia").closest("a")?.getAttribute("href")).toBe("/au");
    expect(within(menu).queryByText("IR35 / 1099 vs W-2")).toBeNull();
    expect(links).toHaveLength(10);
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("navigation", { name: "Mobile menu" })).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });
});
