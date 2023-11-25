import React, { createContext, useState } from "react";
import { getRequest, postRequest, uploadFiless, putRequest,delRequest } from "./apis";
const UserContext = createContext(undefined);
function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [media, setMedia] = useState(null);
  const [galleries, setGalleries] = useState(null);

  const getContext = async (endpoint: string) => {
    try {
      setLoading(true);
      const response = await getRequest(endpoint);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const delContext = async (endpoint: string) => {
    try {
      setLoading(true);
      const response = await delRequest(endpoint);
      if (response) {
        setLoading(false);
        return response;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const postContext = async (endpoint: string, data: any) => {
    try {
      setLoading(true);
      const response = await postRequest(endpoint, data);
      if (response) {
        setLoading(false);
        setNotifications(true);
        return response;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const putContext = async (endpoint: string,data:any) => {
    try {
      setLoading(true);
      const response = putRequest(endpoint,data);
      if (response) {
        setLoading(false);
        setNotifications(true);
        return response;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const uploadFilesContext = async (endpoint: string, formData: any) => {
    try {
      setLoading(true);
      const response = await uploadFiless(endpoint, formData);
      if (response) {
        setNotifications(true);
        setLoading(false);
        return response;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const values = {
    loading: loading,
    media: media,
    notifications: notifications,
    galleries: galleries,
    setLoading: setLoading,
    getContext: getContext,
    postContext: postContext,
    delContext:delContext,
    uploadFilesContext: uploadFilesContext,
    setMedia: setMedia,
    setNotifications: setNotifications,
    putContext: putContext,
    setGalleries: setGalleries,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
