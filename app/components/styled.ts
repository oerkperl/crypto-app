import styled, {keyframes} from "styled-components";

export const Main = styled.main`
max-width:1200px;
margin:0 auto;
padding:0 .5rem;

`
export const Section = styled.section<{$margin?:string|null}>`
width:100%;
margin:${props => props.$margin};
padding:0 .5rem;

`
export const Row = styled.div`
 display:flex
`

export const Col = styled.div<{$width?:string}>`
  box-sizing: border-box;
  min-height: 20px;
  width: ${(props) => props.$width};
  float: left;
`;

export const HorizontalLine = styled.hr`
color:#888
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div<{size?:string}>`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: ${(props) => (props.size ? props.size : "40px")};
  height: ${(props) => (props.size ? props.size : "40px")};
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 25%;
  left: 50%;
  z-index: 11;
`;