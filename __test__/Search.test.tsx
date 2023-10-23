import Search from "@/components/ui/Search";
import { render } from "@testing-library/react";

// Mock useRouter and useSearchParams
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Search Component", () => {
  it("renders with default placeholder", () => {
    const { getByPlaceholderText } = render(<Search />);
    const input = getByPlaceholderText("Search");
    expect(input).toBeInTheDocument();
  });

  it("renders with a specific placeholder", () => {
    const customPlaceholder = "Enter your search query"; // Replace with your desired placeholder

    const { getByPlaceholderText } = render(
      <Search placeholder={customPlaceholder} />
    );
    const input = getByPlaceholderText(customPlaceholder);

    expect(input).toBeInTheDocument();
  });
});
