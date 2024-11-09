import { createContext, useContext } from "react";
import { tokenName,useSession } from "./SessionContext";
import { getResponseModel } from "../../model/responseModel";
import { serverMiddleware } from "../../settings/apiConfig";
import { useLayout } from "./LayoutContext";
import { isJsonString } from "../../settings/utils";

export const RequestContext = createContext();

export const RequestProvider = (props) => {
    const { handleOpenAlert, handleOpenLoader, handleCloseLoader } = useLayout();
    const { token } = useSession();

    const errorMessage = "Ocurrió un error al consumir el recurso solicitado";
    const errorForbiden = "No cuenta con los permisos necesarios para consumir este  recurso";
    const errorNotFound = "No se encontró el recurso solicitado";

    const responseValidatorJson = async function (apiResponse) {
        if (apiResponse.status === 403) {
            return {
                hasError: true,
                httpCode: 403,
                message: errorForbiden,
            };
        }

        if (apiResponse.status === 401) {
            localStorage.removeItem(tokenName);
            window.location.reload();
            return {
                hasError: true,
                httpCode: 401,
                message: errorForbiden,
            };
        }

        return await apiResponse.json();
    };

    const responseValidatorBlob = async function (apiResponse) {
        if (apiResponse.status === 403) {
            return {
                hasError: true,
                httpCode: 403,
                message: errorForbiden,
            };
        }

        if (apiResponse.status === 401) {
            localStorage.removeItem(tokenName);
            window.location.reload();
            return {
                hasError: true,
                httpCode: 401,
                message: errorForbiden,
            };
        }

        if (apiResponse.status === 404) {
            return {
                hasError: true,
                httpCode: 404,
                message: errorNotFound,
            };
        }

        if (apiResponse.status !== 200) {
            return {
                hasError: true,
                httpCode: apiResponse.status,
                message: errorMessage,
            };
        }

        return {
            hasError: false,
            httpCode: 200,
            result: await apiResponse.blob(),
        };
    };

    const GetRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }
        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    if (!isJsonString(response.message))
                        handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    const GetFileRequest = async function (payload) {
        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        let urlEnd = serverMiddleware + payload.url;

        if (payload.query) {
            const queryString =
                "?" +
                Object.keys(payload.query)
                    .map((x) => `${x}=${payload.query[x]}`)
                    .join("&");
            urlEnd += queryString;
        }

        try {
            let apiResponse = await fetch(urlEnd, {
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
            });

            const response = await responseValidatorBlob(apiResponse);
            if (response.hasError) {
                handleOpenAlert(response.message);
                handleCloseLoader();
                return false;
            }

            var url = window.URL.createObjectURL(response.result);
            var a = document.createElement("a");
            a.href = url;
            a.download = payload.filename ? payload.filename : a.download;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove();
            handleCloseLoader();
            return true;
        } catch (error) {
            handleOpenAlert(errorMessage);
        }

        handleCloseLoader();

        return false;
    };

    const PostFileRequest = async function (payload) {
        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        let urlEnd = serverMiddleware + payload.url;

        try {
            let apiResponse = await fetch(urlEnd, {
                method: "POST",
                headers: {
                    authorization: "Bearer " + token,
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload.body),
            });

            const response = await responseValidatorBlob(apiResponse);
            if (response.hasError) {
                handleOpenAlert(response.message);
                handleCloseLoader();
                return false;
            }

            var url = window.URL.createObjectURL(response.result);
            var a = document.createElement("a");
            a.href = url;
            a.download = payload.filename ? payload.filename : a.download;
            document.body.appendChild(a);
            a.click();
            a.remove();
            handleCloseLoader();
            return true;
        } catch (error) {
            handleOpenAlert(errorMessage);
        }

        handleCloseLoader();

        return false;
    };

    const PostRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "POST",
                headers: {
                    authorization: "Bearer " + token,
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload.body),
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    const PostFormRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "POST",
                headers: {
                    authorization: "Bearer " + token,
                },
                body: payload.body,
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    const PutRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + token,
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload.body),
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    const PutFormRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "PUT",
                headers: {
                    authorization: "Bearer " + token,
                },
                body: payload.body,
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    const DeleteRequest = async function (payload) {
        let response = getResponseModel();

        if (payload.loader) {
            handleOpenLoader(payload.loader);
        }

        try {
            let apiResponse = await fetch(serverMiddleware + payload.url, {
                method: "DELETE",
                headers: {
                    authorization: "Bearer " + token,
                },
            });

            response = await responseValidatorJson(apiResponse);

            if (payload.alert) {
                if (!response.hasError) {
                    handleOpenAlert(response.message, "success");
                } else {
                    handleOpenAlert(response.message);
                }
            }
        } catch (error) {
            response.hasError = true;
            response.httpCode = 500;
            response.message = errorMessage;

            handleOpenAlert(response.message);
        }

        handleCloseLoader();

        return response;
    };

    return (
        <RequestContext.Provider
            value={{
                GetRequest,
                GetFileRequest,
                PostRequest,
                PostFormRequest,
                PostFileRequest,
                PutRequest,
                PutFormRequest,
                DeleteRequest,
            }}
        >
            {props.children}
        </RequestContext.Provider>
    );
};

export const useRequest = () => useContext(RequestContext);
