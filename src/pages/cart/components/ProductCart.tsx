import React from "react";
export default function ProductCart({
  setChoosedCpss,
  choosedCpss,
  productSizeColor,
  quantity,
  id,
  updateAt,
  handleAddChoosedCps,
  handleRemoveChoosedCps,
}) {
  const { color, productSize } = productSizeColor;
  const { size, product } = productSize;
  const [currentQuantity, setCurrentQuantity] = React.useState(quantity);
  const handleChangeQuantity = async (event) => {
    const oldQuantity = currentQuantity;
    try {
      if (currentQuantity !== event.target.value) {
        setCurrentQuantity(event.target.value);
        // await addProductToCart({ productSizeColorId: productSizeColor.id, quantity: event.target.value })
        if (choosedCpss.some((cps) => cps.id === id)) {
          setChoosedCpss(
            choosedCpss.map((cps) =>
              cps.id === id ? { id, quantity: event.target.value } : cps
            )
          );
        }
      }
    } catch (error) {
      setCurrentQuantity(oldQuantity);
      // notifyError(error.response.data.message)
    }
  };
  const handleCheckboxProduct = (event) => {
    if (event.target.checked) {
      handleAddChoosedCps({ id, quantity: currentQuantity });
    } else {
      handleRemoveChoosedCps(id);
    }
  };
  const getOriginalPrice = () => {
    return (
      Math.floor((product?.percent * product?.price) / 100000) * 1000 +
      product?.price
    );
  };
  return (
    <div className="h-[120px] p-2 flex flex-row">
      <div className="flex items-center pr-2">
        <input
          type="checkbox"
          checked={choosedCpss.some((cps) => cps.id === id)}
          onChange={handleCheckboxProduct}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      <div className="w-[140px] h-full">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="pl-4 w-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h1 className="italic text-[18px]">{product.name}</h1>
            <h1 className="text-[14px]">Size: {size.name}</h1>
          </div>
          <button className="text-red-600 text-4xl">&times;</button>
        </div>
        <div className="flex justify-between items-end mt-2 sm:mt-0">
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <select
              value={currentQuantity}
              onChange={handleChangeQuantity}
              className="border border-gray-300 rounded-md p-1 w-[60px]"
            >
              {Array.from(
                { length: productSizeColor.quantity },
                (_, i) => i + 1
              ).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={99}>99</option>
            </select>
          </div>
          <div className="text-right">
            <p className="font-bold">
              {product.price.toLocaleString("de-DE")}đ/p
            </p>
            <p className="line-through opacity-70">
              {getOriginalPrice().toLocaleString("de-DE")}đ/p
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
