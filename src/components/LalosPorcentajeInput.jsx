import NumberFormat from "react-number-format";
import { forwardRef } from "react";

const LalosPorcentajeInput = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
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
            thousandSeparator
            isNumericString
            suffix="%"
            decimalScale={4}
            fixedDecimalScale
        />
    );
});

export default LalosPorcentajeInput;
