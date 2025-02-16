import { useState } from "react";
import FullScreenViewContainer from "./FullscreenContainer";

interface FullscreenViewContainerWrapperProps {
  container: (
    handleFullscreenOpen: () => void,
    children: React.ReactNode,
    title: string
  ) => React.ReactElement<any, any>;
  children: (fullScreen: boolean) => React.ReactNode;
  title: string;
  RenderInfoIcon?: React.ReactNode;
}

function FullscreenViewContainerWrapper({
  container,
  children,
  title,
  RenderInfoIcon,
}: FullscreenViewContainerWrapperProps) {
  const [fullScreen, seFullScreen] = useState<boolean>(false);

  const handleFullscreenOpen = () => {
    seFullScreen(true);
  };
  const handleFullscreenClose = () => {
    seFullScreen(false);
  };

  return (
    <>
      {container(handleFullscreenOpen, children(fullScreen), title)}
      <FullScreenViewContainer
        open={fullScreen}
        title={title}
        onClose={handleFullscreenClose}
        RenderInfoIcon={RenderInfoIcon}
      >
        {children(fullScreen)}
      </FullScreenViewContainer>
    </>
  );
}

export default FullscreenViewContainerWrapper;
