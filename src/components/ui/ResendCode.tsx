import { useState } from "react";
import { RotateCw } from "lucide-react"; // Assure-toi d'importer l'icône correctement
import { useAPIRequest } from "@/hooks/use-api-request";
import { ResponseAPI } from "@/types/response";
import { Constant, HttpMethod } from "@/utils/constants";
import { API } from "@/config/api.config";

const ResendButton = ({telephone, setError} : {telephone: string, setError:React.Dispatch<React.SetStateAction<string>>}) => {
    const [loading, setLoading] = useState(false);
    const { data, error, executeRequest } = useAPIRequest<ResponseAPI<any>>();


    

  const handleClick = async () => {
    setLoading(true);
    try {
      // Simule une requête asynchrone (remplace ceci par ton appel API)
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        executeRequest(HttpMethod.POST, API.AUTH.RESEND_OTP,
            {
                data: {
                    telephone
                }
            });

    //   alert("Code renvoyé !");
    } catch (error) {
        console.error("Erreur lors de l'envoi du code ", error);
        setError("Erreur lors de l'envoi du code " + error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleClick}
        type="button"
        disabled={loading}
        className="ml-auto flex items-center gap-2 rounded-lg bg-light-turquoise px-4 py-2 text-white hover:bg-soft-gold transition-colors disabled:opacity-50"
      >
        {loading ? (
          <div className="animate-spin">
            <RotateCw />
          </div>
        ) : (
          <div className="hidden lg:block">
            <RotateCw />
          </div>
        )}
        {loading ? "Envoi..." : "Renvoyer le code"}
      </button>
    </div>
  );
};

export default ResendButton;
