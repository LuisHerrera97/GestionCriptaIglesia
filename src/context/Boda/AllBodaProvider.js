import { InvitadosProvider } from "./InvitadosContext";

export const AllBodaProvider = (props) => (
  <InvitadosProvider>
    {props.children}
  </InvitadosProvider>
);
