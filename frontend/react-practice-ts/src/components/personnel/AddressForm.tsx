import { useDaumPostcodePopup } from 'react-daum-postcode';

const AddressForm = ({setAddressApi}) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddressApi(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type='button' style={buttonStyle} onClick={handleClick}>
      주소 찾기
    </button>
  );
};

const buttonStyle = {
    padding: "12px",
    border: "1px solid #D5D5D5",
    borderRadius: "4px",
}

export default AddressForm;