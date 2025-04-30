import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface Props {
    type: string;
    onClose: () => void;
    onAgree?: () => void | undefined;
}


export default function Alert({type,onClose, onAgree}:Props){



    if(type==="UploadSuccess"){
        return (
            <div className={" rounded-md bg-green-50 p-4 "}>
                <div className="flex">
                    <div className="shrink-0">
                        <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">Successfully uploaded</p>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 focus:outline-hidden"
                            >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

        
    }

    if(type == "UploadFailure"){
        return (
          <div className={" rounded-md bg-green-50 p-4 "}>
           <div className="flex">
               <div className="shrink-0">
               <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
               </div>
               <div className="ml-3">
               <h3 className="text-sm font-medium text-red-800">Upload failed</h3>
               
               </div>
           </div>
           </div>
       )
   }
    
   if(type === "ConfirmDelete"){
    return (
        <div className="rounded-md bg-gray-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <CheckCircleIcon aria-hidden="true" className="size-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Are you sure you want to delete this entry?</h3>
              <div className="mt-2 text-sm text-gray-700">
                <p>You will be unable to restore deleted data</p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick={onAgree}
                    className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
   }



}