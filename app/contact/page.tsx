import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  return (
    <div className="relative h-[78vh] w-[80vw] mx-auto">
        <div className="flex-1">
            <div className="w-full max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                    <h1 className="text-3xl font-semibold tracking-tight">Contact us</h1>
                    <p className="text-muted-foreground">
                        Ready to get in touch? Fill out the form and we&apos;ll get back to you as soon as we can.
                    </p>
                    </div>
                    <div className="space-y-4">
                    <div className="grid gap-4">
                        <Input className="bg-muted" placeholder="Name" type="text" />
                        <Input className="bg-muted" placeholder="Email" type="email" />
                        <Textarea
                        className="min-h-[100px] bg-muted"
                        placeholder="How can we help you?"
                        />
                    </div>
                    <Button className="w-full bg-[#4f46e5] hover:bg-[#4338ca]" size="lg">
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}