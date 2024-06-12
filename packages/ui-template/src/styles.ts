import { DateContainer, SimpleButton } from '@erxes/ui/src/styles/main';
import { colors, dimensions, typography } from '@erxes/ui/src/styles';
import styled, { css } from 'styled-components';
import styledTS from 'styled-components-ts';

import { RightMenuContainer } from '@erxes/ui-cards/src/boards/styles/rightMenu';

const Templates = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    gap: 10px;
    padding: 20px 20px 0 20px;
    
    @media (min-width: 710px) {
        grid-template-columns: repeat(2, 1fr);   
    }

    @media (min-width: 860px) {
        grid-template-columns: repeat(3, 1fr);   
    }

    @media (min-width: 1170px) {
        grid-template-columns: repeat(4, 1fr);   
    }
`

const TemplateBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 25px 30px;
    border-radius: 6px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    cursor: pointer;
`;

const TemplateHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TemplateActions = styled.div`
    position: relative;
`;

const TemplateTitle = styled.h5`
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;

    margin: 0 0 5px;
    line-height: 22px;
`;

const TemplateDescription = styledTS<{ limit?: number }>(styled.div)`
    color: ${colors.colorCoreGray};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    ${({ limit }) => limit ? `-webkit-line-clamp: ${limit};` : ''}
`;

const CategoryItem = styled.div`
    font-size: 12px;
    padding: 2px 5px;
    border: 1px solid ${colors.bgGray};
    border-radius: 6px;
    margin-right: 5px;
`;

const Categories = styledTS<{ justifyContent?: string }>(styled.div)`
    display: flex;
    justify-content: ${props => props.justifyContent || 'end'};
    margin-top: 8px;

    ${CategoryItem}:last-child {
        margin: 0;
    }
`;

const RightDrawerContainer = styledTS<{ width?: number } & any>(
    styled(RightMenuContainer),
)`
    background: ${colors.colorWhite};
    width: ${(props) =>
        props.width ? `calc(100% - ${props.width}px)` : '500px'};
    padding: ${dimensions.unitSpacing}px;
    z-index: 10;
    top: 0;
`;

const FormContent = styled.div`
    padding: 10px 15px 0px;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    height: calc(100vh - 74px);
`;

const FormEditor = styled.div`
    margin: 10px 0;
    background-color: ${colors.colorWhite};
    box-shadow: 0 0 6px 1px ${colors.shadowPrimary};
`;

const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.bgGray};
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const FormTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
`;

const FormActions = styled.div`
    display: flex;

    > i {
        display: flex;
        height: 32px;
        width: 32px;
        margin-left: 8px;
        border-radius: 50%;
        background-color: ${colors.bgGray};
        color: ${colors.colorCoreDarkGray};
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
    }

    > i:last-child {
        color: ${colors.colorPrimary}
    }
`;

const FormFooter = styled.footer`
  display: flex;
  padding: 10px 15px;

  > button {
    width: 100%;
  }
`;

const PreviewWrapper = styled.div`
    border: 1px solid ${colors.bgGray};
    width: 100%;
    height: 200px;
    border-radius: 6px;
    margin: 20px 0;

    .react-flow__controls {
        display: flex;
        gap: 4px;
        box-shadow: none;
    }

    .react-flow__controls-button {
        border: 1px solid ${colors.bgGray};
        border-radius: 6px;
        width: 10px;
        height: 10px;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
    }
`;

const UploadInput = styled.div`
    cursor: pointer;

    input[type="file"] {
        display: none;
    }
`;

export {
    Templates,
    TemplateBox,
    TemplateTitle,
    TemplateActions,
    TemplateHeader,
    FormEditor,
    TemplateDescription,

    Categories,
    CategoryItem,

    RightDrawerContainer,

    FormContent,
    FormHeader,
    FormFooter,
    FormTitle,
    FormActions,

    PreviewWrapper,
    UploadInput
}