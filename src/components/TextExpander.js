import {useState} from "react";

export  default function TextExpander({children}){
    const [plus, setPlus ] = useState(false)
    const textes = children.props.children
    return(
        <section className={"textExpander"}>
            <div className={"container mt-5"}>
                {
                  plus ? textes :  textes.split(' ').slice(0, 20).join(" ") + " ... "
                }
                <button
                    className={" border-0 bg-white text-primary btn-sm"}
                    onClick={()=>setPlus(prevState => !prevState)}
                >
                    {
                        plus ? "voir moins" :  "voir plus"
                    }
                </button>
            </div>
        </section>
    )
}