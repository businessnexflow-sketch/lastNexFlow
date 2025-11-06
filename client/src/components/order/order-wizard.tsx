import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Removed select components for step 2
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ProgressBar from "./progress-bar";
import { georgianContent } from "@/lib/georgian-content";
import { CheckCircle, Upload, Clock, AlertCircle } from "lucide-react";

const formSchema = z.object({
  // Step 1: Project basics
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone must be at least 7 digits").optional(),
  company: z.string().optional(),
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  
  // Step 2: Only description; automation type fixed to custom_workflow
  automationType: z.literal("custom_workflow"),
  customDescription: z.string().min(10, "Please provide a short project description (min 10 chars)"),
  
  // Removed Integrations step
  integrations: z.array(z.string()).optional(),
  hasCredentials: z.record(z.boolean()).optional(),
  
  // Step 4: Files
  files: z.array(z.any()).optional(),
  exampleLink: z.string().url().optional().or(z.literal("")),
  
  // Step 5: Timeline
  deliverySpeed: z.enum(["standard", "fast"]).optional(),
  priorityNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 5;

export default function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  // Tooltip removed with select
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectName: "",
      automationType: "custom_workflow",
      customDescription: "",
      integrations: [],
      hasCredentials: {},
      files: [],
      exampleLink: "",
      deliverySpeed: "standard",
      priorityNotes: "",
    },
  });

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem('order-draft', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('order-draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.keys(data).forEach((key) => {
          if (data[key] !== undefined && data[key] !== null) {
            form.setValue(key as keyof FormData, data[key]);
          }
        });
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [form]);

  const createOrderMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'files') return; // Handle files separately
        if (key === 'integrations' || key === 'hasCredentials') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });

      // Add files
      uploadedFiles.forEach((file) => {
        formData.append('files', file);
      });

      return apiRequest("POST", "/api/orders", formData);
    },
    onSuccess: async (response) => {
      const result = await response.json();
      setOrderId(result.orderId);
      setIsSubmitted(true);
      localStorage.removeItem('order-draft');
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "წარმატება!",
        description: georgianContent.order.success,
      });
    },
    onError: (error) => {
      toast({
        title: "შეცდომა",
        description: "შეკვეთის გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ ხელახლა.",
        variant: "destructive",
      });
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: FormData) => {
    createOrderMutation.mutate(data);
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1: return ['fullName', 'email', 'projectName'];
      case 2: return ['customDescription'];
      case 3: return [];
      case 4: return [];
      case 5: return [];
      default: return [];
    }
  };

  // No automation type selector; always custom_workflow

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Integrations step removed

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-firago">
          {georgianContent.order.success}
        </h2>
        <p className="text-lg text-muted-foreground mb-6 font-firago">
          {georgianContent.order.successFollow.replace("{ORDER_ID}", orderId)}
        </p>
        <Button onClick={() => window.location.reload()} className="font-firago">
          ახალი შეკვეთა
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Project Basics */}
            {currentStep === 1 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Project Basics</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Full name" 
                              {...field} 
                              data-testid="input-full-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Email address" 
                              {...field} 
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Phone (optional)" 
                            {...field} 
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Company (optional)" 
                              {...field} 
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Project name" 
                              {...field} 
                              data-testid="input-project-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Description only */}
            {currentStep === 2 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Short Project Description</h3>
                  <FormField
                    control={form.control}
                    name="customDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Project Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your project and what you want automated..." 
                            className="h-32 resize-none"
                            {...field} 
                            data-testid="textarea-custom-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 3 removed */}

            {/* Step 3: Files */}
            {currentStep === 3 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Attach Files & Examples</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Attach files (CSV, JSON, PNG, PDF)
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <input
                          type="file"
                          multiple
                          accept=".csv,.json,.png,.pdf,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          data-testid="input-file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-primary hover:text-primary/80"
                        >
                          Click to upload files or drag and drop
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Max file size: 10MB
                        </p>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="text-sm">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                data-testid={`button-remove-file-${index}`}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="exampleLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link to example data / docs (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/your-document" 
                              {...field} 
                              data-testid="input-example-link"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 4 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Timeline & Priority</h3>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="deliverySpeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Priority</FormLabel>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                value="standard"
                                checked={field.value === "standard"}
                                onChange={() => field.onChange("standard")}
                                className="w-4 h-4 text-primary"
                                data-testid="radio-standard"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium">Standard — 7–14 days</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Regular delivery timeline with thorough testing
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                value="fast"
                                checked={field.value === "fast"}
                                onChange={() => field.onChange("fast")}
                                className="w-4 h-4 text-primary"
                                data-testid="radio-fast"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-orange-500" />
                                  <span className="font-medium">Fast — 3–5 days</span>
                                  <Badge variant="secondary">Priority</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Expedited delivery for urgent projects
                                </p>
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priorityNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority notes (optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific requirements or deadlines..." 
                              className="h-24 resize-none"
                              {...field} 
                              data-testid="textarea-priority-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Review & Submit</h3>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Project Details</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Name:</strong> {form.watch('fullName')}</p>
                          <p><strong>Email:</strong> {form.watch('email')}</p>
                          {form.watch('phone') && <p><strong>Phone:</strong> {form.watch('phone')}</p>}
                          {form.watch('company') && <p><strong>Company:</strong> {form.watch('company')}</p>}
                          <p><strong>Project:</strong> {form.watch('projectName')}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Automation</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Type:</strong> {form.watch('automationType')?.replace('_', ' ')}</p>
                          <p><strong>Priority:</strong> {form.watch('deliverySpeed')}</p>
                          <p><strong>Files:</strong> {uploadedFiles.length} uploaded</p>
                        </div>
                      </div>
                    </div>

                    {form.watch('customDescription') && (
                      <div>
                        <h4 className="font-semibold mb-2">Custom Description</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                          {form.watch('customDescription')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            Back
          </Button>
          
          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={nextStep}
              data-testid="button-next"
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={createOrderMutation.isPending}
              data-testid="button-submit"
            >
              {createOrderMutation.isPending ? "Submitting..." : "Submit Request"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
