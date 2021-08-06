// ! Made By rishit khandelwal (github.com/rishit-khandelwal)
import styled from "styled-components";

const InfoBox = ({ title, isLink, linkUrl }) => {
  return (
    <div>
      <Box>
        <Text>
          <A href={linkUrl ?? title} target="_blank">
            {title}
          </A>
        </Text>
      </Box>
    </div>
  );
};

const Box = styled.div`
  background-color: var(--background-grey);
  padding: 12px 32px;
  border-radius: 100px;
  display: inline-block;
  text-align: center;
  user-select: none;
`;
const Text = styled.span`
  color: var(--primary-grey);
  font-weight: bold;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin: 7.5px 5px 5px 6px;
`;

const A = styled.a`
  text-decoration: none;
  color: white;
`;

export default InfoBox;
