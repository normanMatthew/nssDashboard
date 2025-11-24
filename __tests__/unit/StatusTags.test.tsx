import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StatusTags } from "../../components/Table/StatusTags";

describe("StatusTags", () => {
    it("renders status text", () => {
        const { getByText } = render(<StatusTags status="success"/>);
        expect(getByText("SUCCESS")).toBeDefined();
    });
});