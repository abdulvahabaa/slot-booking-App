import  { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const ConfirmDialogBox = () => {
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000
        });
    };

    const reject = () => {
        toast.current.show({
            severity: 'warn',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000
        });
    };

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg w-96 max-w-full">
                        {/* Icon Circle */}
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600">
                            <i className="pi pi-question text-3xl"></i>
                        </div>

                        {/* Header */}
                        <h2 className="text-xl font-bold mt-4" ref={headerRef}>
                            {message.header}
                        </h2>

                        {/* Message */}
                        <p className="text-gray-600 dark:text-gray-300 text-center mt-2" ref={contentRef}>
                            {message.message}
                        </p>

                        {/* Footer Buttons */}
                        <div className="flex gap-4 mt-6" ref={footerRef}>
                            <Button
                                label="Confirm"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-28 bg-green-500 hover:bg-green-600 text-white"
                            />
                            <Button
                                label="Cancel"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-28 border-red-500 text-red-500 hover:bg-red-50"
                            />
                        </div>
                    </div>
                )}
            />

            {/* Trigger Button */}
            <div className="card flex justify-center mt-4">
                <Button label="Book Slot" severity="success" outlined onClick={confirm1} icon="pi pi-check" />
            </div>
        </>
    );
};

export default ConfirmDialogBox;
