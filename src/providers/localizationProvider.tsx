import 'dayjs/locale/fr'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactNode } from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

interface ProvidersProps {
  children: ReactNode;
}

const DateProviders: React.FC<ProvidersProps> = ({ children }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} /*localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}*/ adapterLocale='fr'>
      {children}
    </LocalizationProvider>
  );
}
export default DateProviders;