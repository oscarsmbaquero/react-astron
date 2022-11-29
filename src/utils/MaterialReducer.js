export const tabsInitState = {
  addMaterial: false,
  listMaterial: false,
  tecnicoMaterial: false,
  materialEnvio: false,
};

export const tabsReducer = (currentState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...action.payload,
        addMaterial: true,
      };
    case "LIST":
      return {
        ...action.payload,
        listMaterial: true,
      };
    case "TECNICO":
      return {
        ...action.payload,
        tecnicoMaterial: true,
      };
      case "ENVIO":
      return {
        ...action.payload,
        materialEnvio: true,
      };

    default:
      return {
        ...currentState,
      };
  }
};
