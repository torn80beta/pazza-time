"use client";

export default function AddressInputs({
  addressProps,
  setAddressProp,
  currentUserData,
}) {
  // console.log(setter);
  const { phone, streetAddress, city, postalCode, country } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setAddressProp("phone", e.target.value)}
      />
      <label>Street address</label>
      <input
        type="text"
        placeholder="Street address"
        value={streetAddress}
        onChange={(e) => setAddressProp("streetAddress", e.target.value)}
      />

      <div className="flex gap-2">
        <div className="grow">
          <label>City</label>
          <input
            // style={{ margin: "0" }}
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddressProp("city", e.target.value)}
          />
        </div>

        <div>
          <label>Postal code</label>
          <input
            // style={{ margin: "0" }}
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setAddressProp("postalCode", e.target.value)}
          />
        </div>
      </div>

      <div className={`mb-${currentUserData?.admin ? "2" : "4"}`}>
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setAddressProp("country", e.target.value)}
        />
      </div>
    </>
  );
}
