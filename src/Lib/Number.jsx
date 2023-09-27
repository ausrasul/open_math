import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


/*const AnswerField = styled(TextField)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(4)};
  text-align: center;
  margin: ${theme.spacing(0.5)};
`
);
*/
const Empty = styled(Paper)(
  ({ theme }) => `
  visibility: hidden;
  height: ${theme.spacing(3)};
  width: ${theme.spacing(2)};
  //padding: ${theme.spacing(2)};
  margin: ${theme.spacing(2.5)};
`
);

const NumberContainer = styled(Paper)(
  ({ theme }) => `
  width: ${theme.spacing(2)};
  height: ${theme.spacing(3)};
  text-align: center;
  padding: ${theme.spacing(2)};
  margin: ${theme.spacing(0.5)};
`
);

const StyledNumber = styled("div")`
  font-weight: bold;
  font-family: Courier New;
  font-size: xx-large;
  color: rgb(98, 98, 98);
`;

const StyledTinyNumber = styled("div")`
  font-weight: bold;
  font-family: Courier New;
  font-size: large;
  color: rgb(98, 98, 98);
`;

const CrossedOff = styled("div")`
  position: relative;
  width: 200%;
  height: 2px;
  background-color: red;
  transform-origin: -40% 0;
  transform: rotate(-45deg);
`;

const CrossedOffTiny = styled("div")`
  position: relative;
  width: 200%;
  height: 2px;
  background-color: red;
  transform-origin: 0 0;
  transform: rotate(-45deg);
`;

export default function Number(props) {
  const { empty, tiny, ...restProps } = props;
  if (tiny) return <TinyNumber {...restProps} />;
  if (empty) return <Empty {...restProps}/>
  return <NormalNumber {...restProps} />;
}

function TinyNumber(props) {
  return (
    <NumberContainer className={props.className} sx={props.sx} onClick={props.onClick}>
      <StyledTinyNumber>
        {props.value}
        {props.crossedOff && <CrossedOffTiny />}
      </StyledTinyNumber>
    </NumberContainer>
  );
}

function NormalNumber(props) {
  return (
    <NumberContainer className={props.className} sx={props.sx} onClick={props.onClick}>
      <StyledNumber>{props.value}</StyledNumber>
      {props.crossedOff && <CrossedOff />}
    </NumberContainer>
  );
}
