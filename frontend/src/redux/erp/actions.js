import * as actionTypes from "./types";
import { request } from "@/request";

export const erp = {
  resetState: () => async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });
  },
  resetAction: (actionType) => async (dispatch) => {
    dispatch({
      type: actionTypes.RESET_ACTION,
      keyState: actionType,
      payload: null,
    });
  },
  currentItem: (data) => async (dispatch) => {
    dispatch({
      type: actionTypes.CURRENT_ITEM,
      payload: { ...data },
    });
  },
  currentAction: (actionType, data) => async (dispatch) => {
    dispatch({
      type: actionTypes.CURRENT_ACTION,
      keyState: actionType,
      payload: { ...data },
    });
  },
  list:
    (entity, options = { page: 1 }) =>
    async (dispatch) => {
      dispatch({
        type: actionTypes.REQUEST_LOADING,
        keyState: "list",
        payload: null,
      });

      let data = await request.list(entity, options);

      if (data.success === true) {
        const result = {
          items: data.result,
          pagination: {
            current: parseInt(data.pagination.page, 10),
            pageSize: 10,
            total: parseInt(data.pagination.count, 10),
          },
        };
        dispatch({
          type: actionTypes.REQUEST_SUCCESS,
          keyState: "list",
          payload: result,
        });
      } else {
        dispatch({
          type: actionTypes.REQUEST_FAILED,
          keyState: "list",
          payload: null,
        });
      }
    },
  create: (entity, jsonData) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "create",
      payload: null,
    });
    console.log("jsonData action redux", jsonData);
    let data = await request.create(entity, jsonData);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "create",
        payload: data.result,
      });
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "create",
        payload: null,
      });
    }
  },
  recordPayment: (entity, jsonData) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "recordPayment",
      payload: null,
    });

    let data = await request.create(entity, jsonData);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "recordPayment",
        payload: data.result,
      });
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result.invoice,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "recordPayment",
        payload: null,
      });
    }
  },
  read: (entity, itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "read",
      payload: null,
    });

    let data = await request.read(entity, itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "read",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "read",
        payload: null,
      });
    }
  },
  update: (entity, itemId, jsonData) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "update",
      payload: null,
    });

    let data = await request.update(entity, itemId, jsonData);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "update",
        payload: data.result,
      });
      dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "update",
        payload: null,
      });
    }
  },

  delete: (entity, itemId) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "delete",
      payload: null,
    });

    let data = await request.delete(entity, itemId);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "delete",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "delete",
        payload: null,
      });
    }
  },

  search: (entity, source, options) => async (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_LOADING,
      keyState: "search",
      payload: null,
    });

    source.cancel();

    source = request.source();
    let data = await request.search(entity, source, options);

    if (data.success === true) {
      dispatch({
        type: actionTypes.REQUEST_SUCCESS,
        keyState: "search",
        payload: data.result,
      });
    } else {
      dispatch({
        type: actionTypes.REQUEST_FAILED,
        keyState: "search",
        payload: null,
      });
    }
  },
};
