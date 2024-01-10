import styled from "styled-components";

export const Main = styled.main`
max-width:1000px;
margin:0 auto;
padding:0 .5rem;

`
export const Section = styled.section<{$margin:string}>`
width:100%;
margin:${props => props.$margin};
padding:0 .5rem;

`
export const Row = styled.div`
 display:flex
`

export const Col = styled.div<{$width:string}>`
  box-sizing: border-box;
  min-height: 20px;
  width: ${(props) => props.$width};
  float: left;
`;