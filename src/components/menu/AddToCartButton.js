import React from "react";
// import FlyingButton from "updated-react-flying-item";

export default function AddToCartButton({
  hasOptions,
  basePrice,
  onClick,
  // image,
}) {
  // if (!hasOptions) {
  //   return (
  //     <div className="flying-button-parent mt-4">
  //       <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
  //         <div onClick={onClick}>
  //           <span>Add to cart ${basePrice}</span>
  //         </div>
  //       </FlyingButton>
  //     </div>
  //   );
  // }

  return (
    <button
      type="button"
      className="mt-4 bg-primary rounded-full text-white px-8 py-2"
      onClick={onClick}
    >
      {/* <span>Select extras</span> */}
      {hasOptions ? (
        <span>Select extras</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
