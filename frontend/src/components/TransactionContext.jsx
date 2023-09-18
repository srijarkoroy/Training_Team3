import {createContext, useContext, useState} from 'react';
import Transaction from './Transaction';

const TransactionContext = createContext();

export function useTransaction() {
    return useContext(TransactionContext)
}

export function TransactionProvider({children}) {
    const[transactionData, setTransactionData] = useState(null);
    const setTransaction = (data) => {
        setTransactionData(data);
    };

    return (
        <TransactionContext.Provider value = {{
            transactionData, setTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}