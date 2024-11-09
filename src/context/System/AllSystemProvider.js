import { ConfigurationProvider } from "./ConfigurationContext";
import { LayoutProvider } from "./LayoutContext";
import { RequestProvider } from "./RequestContext";
import { SessionProvider } from "./SessionContext";

export const AllSystemProvider = (props) => (
  <ConfigurationProvider>
    <LayoutProvider>
      <SessionProvider>
        <RequestProvider>
          {props.children}
        </RequestProvider>
      </SessionProvider>
    </LayoutProvider>
  </ConfigurationProvider>
);
