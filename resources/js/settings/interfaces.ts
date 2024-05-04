interface ToastProps {
    color: string;
    message: string;
    isToastVisible: boolean;
}

interface PropsErrors {
    errors: {name: string}
}

interface IModalUpdateDelete {
    modalId: string;
    title: string;
    description: any;
    idVehicle: number;
    isUpdate: boolean;
    cancel: () => void,
    setValuesTable: () => void
}