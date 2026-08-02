// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { ToolAnalytics } from "@/components/ToolAnalytics";
import { announceToolAction, ANALYTICS_READY_EVENT } from "@/lib/analytics";

const params = {
  tool_slug: "example-calculator",
  tool_region: "UK",
  tool_category: "leaving-job",
};

function Harness({ valid = true, clickDriven = false }: { valid?: boolean; clickDriven?: boolean }) {
  return (
    <>
      <ToolAnalytics
        toolSlug={params.tool_slug}
        toolRegion={params.tool_region}
        toolCategory={params.tool_category}
      />
      <section data-calculator-inputs={params.tool_slug}>
        <form>
          <label htmlFor="salary">Salary</label>
          <input id="salary" defaultValue="100" />
        </form>
        <div data-calculator-result-valid={valid ? "true" : "false"}>Result</div>
        {clickDriven && <button data-calculator-click-start>Answer question</button>}
      </section>
      <a href="#official-source" data-calculator-source={params.tool_slug}>
        Official source
      </a>
    </>
  );
}

describe("ToolAnalytics", () => {
  beforeEach(() => {
    window.localStorage.setItem("mpr_cookie_consent", "accepted");
    window.requestAnimationFrame = (callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(0), 0);
    window.gtag = vi.fn();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("tracks the privacy-safe calculator funnel once", async () => {
    const { getByLabelText } = render(<Harness />);

    await waitFor(() =>
      expect(window.gtag).toHaveBeenCalledWith("event", "calculator_view", params),
    );
    fireEvent.change(getByLabelText("Salary"), { target: { value: "200" } });
    fireEvent.change(getByLabelText("Salary"), { target: { value: "300" } });

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_start", params);
    await waitFor(() =>
      expect(window.gtag).toHaveBeenCalledWith("event", "calculator_result", params),
    );
    expect(
      (window.gtag as ReturnType<typeof vi.fn>).mock.calls.filter(
        (call) => call[1] === "calculator_start",
      ),
    ).toHaveLength(1);
    expect(
      (window.gtag as ReturnType<typeof vi.fn>).mock.calls.filter(
        (call) => call[1] === "calculator_result",
      ),
    ).toHaveLength(1);
  });

  it("tracks click-driven wizards through the same start and result funnel", async () => {
    const { getByRole } = render(<Harness clickDriven />);
    await waitFor(() => expect(window.gtag).toHaveBeenCalled());

    fireEvent.click(getByRole("button", { name: "Answer question" }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_start", params);
    await waitFor(() =>
      expect(window.gtag).toHaveBeenCalledWith("event", "calculator_result", params),
    );
  });

  it("tracks successful PDF/share actions and official source clicks", async () => {
    const { getByRole } = render(<Harness />);
    await waitFor(() => expect(window.gtag).toHaveBeenCalled());

    announceToolAction("calculator_pdf_download");
    announceToolAction("calculator_share");
    fireEvent.click(getByRole("link", { name: "Official source" }));

    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_pdf_download", params);
    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_share", params);
    expect(window.gtag).toHaveBeenCalledWith("event", "calculator_source_click", params);
  });

  it("waits for analytics consent/readiness and never includes input values", async () => {
    delete (window as Partial<Window>).gtag;
    const { getByLabelText } = render(<Harness />);
    fireEvent.change(getByLabelText("Salary"), { target: { value: "987654" } });

    const gtag = vi.fn();
    window.gtag = gtag;
    window.dispatchEvent(new Event(ANALYTICS_READY_EVENT));

    await waitFor(() => expect(gtag).toHaveBeenCalledWith("event", "calculator_view", params));
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("987654");
  });

  it("sends nothing after consent is rejected", async () => {
    window.localStorage.setItem("mpr_cookie_consent", "rejected");
    const { getByLabelText } = render(<Harness />);
    fireEvent.change(getByLabelText("Salary"), { target: { value: "200" } });
    announceToolAction("calculator_share");

    expect(window.gtag).not.toHaveBeenCalled();
  });
});
