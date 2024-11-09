import { NumericFormat } from 'react-number-format';
import { forwardRef } from "react";

const LalosOnlyNumberInput = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            decimalScale={4}
        />
    );
});

export default LalosOnlyNumberInput;
