
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

export default function IntegrationSettings() {
  const { voiceProps } = useVoiceTrigger({
    what: "Connect your ATS to external services like calendar systems, messaging platforms, and social networks."
  });

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect external services and tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                  <path fill="#1976D2" d="M38 24v-4H14v-4h24v-4L48 22 38 32v-4h-4v16H10V28H0V8h34v16h4z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Google Calendar</h3>
                <p className="text-gray-500 text-sm">Connect calendar for interview scheduling</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
          
          <div className="border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.712 33.7936L23.2932 42.0964L28.3569 36.8201L38.4526 45.3721L45.1869 9.45557L8.02014 25.0355L16.3161 29.3371L19.712 33.7936Z" fill="#229ED9"/>
                  <path d="M16.3159 29.3371L43.5528 14.5917L19.712 33.7934L16.3159 29.3371Z" fill="#229ED9"/>
                  <path d="M19.712 33.7936L29.3829 39.2854L23.2932 42.0964L19.712 33.7936Z" fill="#229ED9"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Telegram</h3>
                <p className="text-gray-500 text-sm">Send notifications via Telegram</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
          
          <div className="border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 120 120">
                  <path d="M99.4 80C99.4 81.1 98.5 82 97.4 82H67.5C66.4 82 65.5 81.1 65.5 80V46.8C65.5 45.7 66.4 44.8 67.5 44.8H97.4C98.5 44.8 99.4 45.7 99.4 46.8V80Z" fill="#4A154B"/>
                  <path d="M54.5 26C54.5 24.9 53.6 24 52.5 24H22.6C21.5 24 20.6 24.9 20.6 26V59.2C20.6 60.3 21.5 61.2 22.6 61.2H52.5C53.6 61.2 54.5 60.3 54.5 59.2V26Z" fill="#4A154B"/>
                  <path d="M99.4 26C99.4 24.9 98.5 24 97.4 24H67.5C66.4 24 65.5 24.9 65.5 26V35.9C65.5 37 66.4 37.9 67.5 37.9H97.4C98.5 37.9 99.4 37 99.4 35.9V26Z" fill="#4A154B"/>
                  <path d="M54.5 69.9C54.5 68.8 53.6 67.9 52.5 67.9H22.6C21.5 67.9 20.6 68.8 20.6 69.9V79.8C20.6 80.9 21.5 81.8 22.6 81.8H52.5C53.6 81.8 54.5 80.9 54.5 79.8V69.9Z" fill="#4A154B"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Slack</h3>
                <p className="text-gray-500 text-sm">Connect with Slack for notifications</p>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
          
          <div className="border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
                  <path fill="#0A66C2" d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <p className="text-gray-500 text-sm">Connect for candidate sourcing</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-sm">Connected</span>
              <Button variant="outline">Disconnect</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
