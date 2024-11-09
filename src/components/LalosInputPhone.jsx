import { IMaskInput } from "react-imask";
import { forwardRef } from "react";

export const LalosInputPhone = forwardRef(function LalosInputPhone(props, ref) {
    const { onChange, ...other } = props;

    return (
        <IMaskInput
            {...other}
            mask="#00 000 0000"
            definitions={{
                "#": /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});
