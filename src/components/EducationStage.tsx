import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, ChatCircle, Heart } from '@phosphor-icons/react';
import { educationalContent, exampleDialogues, resources } from '@/lib/content';
import { motion } from 'framer-motion';

export function EducationStage() {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const selectedDialogue = exampleDialogues.find(d => d.id === selectedExample);

  if (selectedDialogue) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card>
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => setSelectedExample(null)}
                className="w-fit mb-2"
              >
                ← חזרה
              </Button>
              <CardTitle>{selectedDialogue.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {selectedDialogue.messages.map((msg, idx) => (
                    <div key={idx} className="space-y-2">
                      <div
                        className={`p-4 rounded-lg ${
                          msg.speaker === 'user'
                            ? 'bg-accent/20 mr-8'
                            : 'bg-muted ml-8'
                        }`}
                      >
                        <p className="font-medium text-sm mb-1">
                          {msg.speaker === 'user' ? 'את' : 'הצד השני'}
                        </p>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.annotation && (
                        <div className="bg-destructive/10 p-3 rounded-md text-sm border-r-4 border-destructive mr-8">
                          {msg.annotation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="bg-primary/5 p-4 rounded-lg border-r-4 border-primary">
                <p className="font-semibold mb-2">סיכום והסבר:</p>
                <p className="leading-relaxed">{selectedDialogue.summary}</p>
              </div>

              <Button onClick={() => setSelectedExample(null)} className="w-full">
                חזרה לתוכן העיקרי
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{educationalContent.welcome.title}</CardTitle>
            <CardDescription className="text-base">
              {educationalContent.welcome.content}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" dir="rtl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info" className="gap-2">
                  <Info size={20} />
                  מידע
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <ChatCircle size={20} />
                  דוגמאות
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <Heart size={20} />
                  משאבים
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 mt-6">
                <ScrollArea className="h-[500px] w-full pr-4">
                  {educationalContent.sections.map((section, idx) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="mb-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="leading-relaxed">{section.content}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="examples" className="space-y-4 mt-6">
                <ScrollArea className="h-[500px] w-full pr-4">
                  <div className="space-y-4">
                    {exampleDialogues.map((example, idx) => (
                      <motion.div
                        key={example.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card 
                          className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/20"
                          onClick={() => setSelectedExample(example.id)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{example.title}</CardTitle>
                            <CardDescription>
                              לחצי לצפייה בדיאלוג המלא עם הסברים
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              variant="outline"
                              className="w-full"
                            >
                              צפייה בדוגמה ←
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4 mt-6">
                <ScrollArea className="h-[500px] w-full pr-4">
                  <div className="space-y-4">
                    <div className="bg-accent/20 p-4 rounded-lg border-r-4 border-accent">
                      <p className="font-semibold mb-2">חשוב לדעת:</p>
                      <p className="leading-relaxed">
                        אם את חווה מצב של אלימות או מניפולציה, את לא לבד. יש עזרה זמינה,
                        וההחלטה לפנות לעזרה היא סימן לכוח, לא לחולשה.
                      </p>
                    </div>

                    {resources.map((resource, idx) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {resource.type === 'hotline' && '📞'}
                              {resource.type === 'support' && '🤝'}
                              {resource.type === 'info' && 'ℹ️'}
                              {resource.title}
                            </CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              asChild
                              variant="default"
                              className="w-full"
                            >
                              <a
                                href={resource.link}
                                target={resource.link.startsWith('tel:') ? '_self' : '_blank'}
                                rel={resource.link.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                              >
                                {resource.link.startsWith('tel:') ? 'התקשרי עכשיו' : 'מעבר לאתר'}
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
