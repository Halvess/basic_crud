import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from '../components/Context'
import Modal from "../components/Modal/Modal";
import Text from "../components/Text/Text";
import translations from '../constants/translations.json'

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  const {language} = useContext(Context);
  const {pageTitle, pageMessage, codeTitle, messageTitle, [404]: notFound, [500]: serverError} = translations[language]['errorPage']
  let errorCode = error.status 
  let errorMessage = ''
  if (isRouteErrorResponse(error)){
      if (errorCode == 404){
        errorMessage = notFound
      }
      if (errorCode == 500){
        errorMsg = serverError
      }
  }
  else{
    errorCode = '000'
    errorMessage = error.message || error.statusText
  }

    const modalMessage = "Something went wrong, here's some details on what happened"
    const modalChildren = <div className='modalErrorWrapper pagePadding baseMarginTop largeMarginBottom'>
                            <div>
                                <Text content={codeTitle} className="textCenter errorTitle"/>
                                <Text content={errorCode} className="textCenter"/>
                            </div>
                            <div>
                                <Text content={messageTitle} className="textCenter errorTitle"/>
                                <Text content={errorMessage} className="textCenter"/>    
                            </div>
                          </div>

  return (
        <Modal origin='error' title={pageTitle} show={true} children={modalChildren} message={pageMessage}/>
  );
}