
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const warning = (message) => {
    toast(message, {
        "type": "warning",
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
  }
export const success = (message) => {
    toast(message, {
        "type": "success",
        "transition": "slide",
        "dangerouslyHTMLString": true
    })
}

export const getErrorStr = (errorsArr: Record<string, string[]>): string => {
    let errorStr = ''; // Use let instead of const

    Object.entries(errorsArr).forEach(([key, messages]) => {
        messages.forEach((message) => {
            errorStr += `\n${message}`;
        });
    });

    return errorStr.trim(); // Trim to remove leading newline
};
