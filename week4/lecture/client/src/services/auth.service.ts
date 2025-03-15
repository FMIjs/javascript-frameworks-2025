import { fetchResource } from "../helpers/fetch";

export class AuthService {
  login = (body: { email: string; password: string }) =>
    fetchResource({ url: `/api/session`, method: "POST", body });

  logout = () => fetchResource({ url: `/api/session`, method: "DELETE" });
}
