// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RedundancyCalculator } from "@/components/calculators/RedundancyCalculator";

afterEach(cleanup);

/** Skip the eligibility gate so tests reach the calculator inputs. */
function skipGate() {
  fireEvent.click(screen.getByRole("button", { name: /skip check/i }));
}

describe("RedundancyCalculator (component wiring)", () => {
  it("renders the eligibility gate before the calculator", () => {
    render(<RedundancyCalculator />);
    expect(screen.getByText(/eligibility check/i)).toBeTruthy();
    // Calculator inputs should not be visible yet
    expect(screen.queryByLabelText("Gross weekly pay")).toBeNull();
  });

  it("proceeds through all three yes-answers to reveal the calculator", () => {
    render(<RedundancyCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /yes, 2\+ years/i }));
    fireEvent.click(screen.getByRole("button", { name: /yes, i'm an employee/i }));
    fireEvent.click(screen.getByRole("button", { name: /yes, genuine redundancy/i }));
    // defaults: age 40, 6 years, £500/wk => 6 weeks × £500 = £3,000
    expect(screen.getAllByText("£3,000").length).toBeGreaterThan(0);
  });

  it("shows ineligible message when first answer is no", () => {
    render(<RedundancyCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /no, less than 2 years/i }));
    expect(screen.getByText(/may not qualify/i)).toBeTruthy();
  });

  it("renders the default live result after skipping gate", () => {
    render(<RedundancyCalculator />);
    skipGate();
    // defaults: age 40, 6 years, £500/wk => 6 weeks × £500 = £3,000
    expect(screen.getAllByText("£3,000").length).toBeGreaterThan(0);
  });

  it("recomputes live when an input changes (no submit)", () => {
    render(<RedundancyCalculator />);
    skipGate();
    const weekly = screen.getByLabelText("Gross weekly pay") as HTMLInputElement;
    fireEvent.change(weekly, { target: { value: "600" } });
    // 6 weeks × £600 = £3,600
    expect(screen.getAllByText("£3,600").length).toBeGreaterThan(0);
  });

  it("shows the download CTA only for a valid result", () => {
    render(<RedundancyCalculator />);
    skipGate();
    expect(screen.getByRole("button", { name: /download pdf summary/i })).toBeTruthy();

    const years = screen.getByLabelText("Full years of service") as HTMLInputElement;
    fireEvent.change(years, { target: { value: "1" } }); // below 2-year minimum
    expect(screen.queryByRole("button", { name: /download pdf summary/i })).toBeNull();
  });
});
