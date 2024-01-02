import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
   const [featProfessionals, setFeatProfessionals] = useState(null);
   const [featArticles, setFeatArticles] = useState(null);
   const [articlesTags, setArticlesTags] = useState(null);
   const [professionalsTags, setProfessionalsTags] = useState(null);

   return (
      <ContentContext.Provider
         value={{
            featProfessionals,
            setFeatProfessionals,
            featArticles,
            setFeatArticles,
            articlesTags,
            setArticlesTags,
            professionalsTags,
            setProfessionalsTags
         }}
      >
         {children}
      </ContentContext.Provider>
   );
};

export const useContent = () => useContext(ContentContext);