import { CustomArrowProps } from "react-slick";

interface IArrowType extends CustomArrowProps {
  slidesToShow: number;
  offsetYPositonArrows?: string;
}

export const NextArrow = (props: IArrowType) => {
  const {
    className,
    onClick,
    currentSlide,
    slideCount,
    slidesToShow,
    offsetYPositonArrows,
  } = props;
  return (
    <div className={currentSlide === (slideCount ?? 0) - slidesToShow ? "d-none" : ""}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ transform: "scale(1.3)", top: `${offsetYPositonArrows ?? "50%"}` }}
        onClick={onClick}
      >
        <rect width="32" height="32" rx="6" fill="#1F7A8C" />
        <mask
          id="mask0_193_951"
          maskUnits="userSpaceOnUse"
          x="4"
          y="4"
          width="24"
          height="24"
        >
          <rect
            x="28"
            y="28"
            width="24"
            height="24"
            transform="rotate(-180 28 28)"
            fill="#E1E5F2"
          />
        </mask>
        <g mask="url(#mask0_193_951)">
          <path
            d="M12 6L22 16L12 26L10.225 24.225L18.45 16L10.225 7.775L12 6Z"
            fill="#E1E5F2"
          />
        </g>
      </svg>
    </div>
  );
};
