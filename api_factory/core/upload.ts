import { GATEWAY_ENDPOINT } from "../axios.config";

export const upload_api = {
  $_single_upload(data: any) {
    return GATEWAY_ENDPOINT.post("/images", data);
  },
  $_batch_upload(data: any) {
    return GATEWAY_ENDPOINT.post("/images/batch", data);
  },
  $_form_upload(token: string, data: any) {
    return GATEWAY_ENDPOINT.post(`/forms/upload/${token}`, data);
  },
  $_program_upload(token: string, data: any) {
    return GATEWAY_ENDPOINT.post(`/programs/upload/${token}`, data);
  }
};
